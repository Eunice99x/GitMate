"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  ruleType: z.enum(["PATTERN", "COMPLEXITY", "NAMING", "SECURITY", "PERFORMANCE", "CUSTOM"]),
  pattern: z.string().min(1, {
    message: "Pattern is required.",
  }),
  severity: z.enum(["INFO", "WARNING", "ERROR"]),
  enabled: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

interface Rule {
  id: string
  name: string
  description: string | null
  ruleType: string
  pattern: string
  severity: string
  enabled: boolean
}

interface CustomRulesFormProps {
  repositoryId: string
}

export function CustomRulesForm({ repositoryId }: CustomRulesFormProps) {
  const [rules, setRules] = useState<Rule[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      ruleType: "PATTERN",
      pattern: "",
      severity: "WARNING",
      enabled: true,
    },
  })

  // Load rules from localStorage on component mount
  useEffect(() => {
    const loadRules = () => {
      setIsLoading(true)
      try {
        const savedRules = localStorage.getItem(`rules-${repositoryId}`)
        if (savedRules) {
          setRules(JSON.parse(savedRules))
        }
      } catch (error) {
        console.error("Error loading rules:", error)
        toast({
          title: "Error loading rules",
          description: "There was a problem loading your custom rules.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadRules()
  }, [repositoryId, toast])

  // Save rules to localStorage
  const saveRules = (updatedRules: Rule[]) => {
    try {
      localStorage.setItem(`rules-${repositoryId}`, JSON.stringify(updatedRules))
    } catch (error) {
      console.error("Error saving rules:", error)
      toast({
        title: "Error saving rules",
        description: "There was a problem saving your custom rules.",
        variant: "destructive",
      })
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)

      // Generate a unique ID for new rules
      const newRule: Rule = {
        id: editingRule ? editingRule.id : `rule-${Date.now()}`,
        name: values.name,
        description: values.description || null,
        ruleType: values.ruleType,
        pattern: values.pattern,
        severity: values.severity,
        enabled: values.enabled,
      }

      let updatedRules: Rule[]

      if (editingRule) {
        // Update existing rule
        updatedRules = rules.map((rule) => (rule.id === editingRule.id ? newRule : rule))
      } else {
        // Add new rule
        updatedRules = [...rules, newRule]
      }

      // Save to localStorage
      saveRules(updatedRules)
      setRules(updatedRules)

      // Reset form and editing state
      form.reset()
      setEditingRule(null)

      toast({
        title: `Rule ${editingRule ? "updated" : "created"} successfully`,
        description: `The rule "${values.name}" has been ${editingRule ? "updated" : "created"}.`,
      })
    } catch (error: any) {
      toast({
        title: `Failed to ${editingRule ? "update" : "create"} rule`,
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule)
    form.reset({
      name: rule.name,
      description: rule.description || "",
      ruleType: rule.ruleType as any,
      pattern: rule.pattern,
      severity: rule.severity as any,
      enabled: rule.enabled,
    })
  }

  const handleDeleteRule = async (ruleId: string) => {
    try {
      const updatedRules = rules.filter((rule) => rule.id !== ruleId)
      saveRules(updatedRules)
      setRules(updatedRules)

      toast({
        title: "Rule deleted successfully",
        description: "The rule has been deleted.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to delete rule",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingRule(null)
    form.reset()
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Custom Review Rules</CardTitle>
          <CardDescription>Loading rules...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingRule ? "Edit Rule" : "Create New Rule"}</CardTitle>
          <CardDescription>
            {editingRule
              ? "Update an existing custom review rule"
              : "Define custom rules for code reviews based on patterns and best practices"}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., No console.log statements" {...field} />
                    </FormControl>
                    <FormDescription>A descriptive name for your rule</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., Prevents console.log statements from being committed to production code"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>Explain what this rule checks for and why it's important</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ruleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a rule type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PATTERN">Pattern Matching</SelectItem>
                          <SelectItem value="COMPLEXITY">Complexity</SelectItem>
                          <SelectItem value="NAMING">Naming Convention</SelectItem>
                          <SelectItem value="SECURITY">Security</SelectItem>
                          <SelectItem value="PERFORMANCE">Performance</SelectItem>
                          <SelectItem value="CUSTOM">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>The category this rule belongs to</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="INFO">Info</SelectItem>
                          <SelectItem value="WARNING">Warning</SelectItem>
                          <SelectItem value="ERROR">Error</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How serious violations of this rule are</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pattern"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pattern</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., console\.log\(" {...field} />
                    </FormControl>
                    <FormDescription>
                      A regular expression pattern to match in the code. For complexity rules, specify the threshold.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enabled</FormLabel>
                      <FormDescription>Whether this rule should be active during code reviews</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingRule ? (
                <>
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    Update Rule
                  </Button>
                </>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="ml-auto">
                  {isSubmitting && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Rule
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Rules</CardTitle>
          <CardDescription>
            {rules.length === 0
              ? "No custom rules defined yet"
              : `${rules.length} custom ${rules.length === 1 ? "rule" : "rules"} defined`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rules.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No custom rules have been created yet. Add your first rule above.
            </div>
          ) : (
            <div className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-start justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{rule.name}</h4>
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          rule.severity === "ERROR"
                            ? "bg-red-100 text-red-800"
                            : rule.severity === "WARNING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {rule.severity}
                      </div>
                      {!rule.enabled && (
                        <div className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">Disabled</div>
                      )}
                    </div>
                    {rule.description && <p className="text-sm text-muted-foreground">{rule.description}</p>}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Type: {rule.ruleType}</span>
                      <span>•</span>
                      <span>
                        Pattern: <code className="bg-muted px-1 py-0.5 rounded">{rule.pattern}</code>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditRule(rule)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)}>
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

