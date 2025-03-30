// User roles and permissions service

export type UserRole = "ADMIN" | "USER"
export type TeamRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER"

interface TeamMember {
  userId: string
  role: TeamRole
}

interface Team {
  id: string
  name: string
  description?: string
  members: TeamMember[]
}

// Get user role
export function getUserRole(userId: string): UserRole {
  if (typeof window === "undefined") return "USER"

  const admins = JSON.parse(localStorage.getItem("adminUsers") || "[]")
  return admins.includes(userId) ? "ADMIN" : "USER"
}

// Set user as admin
export function setUserAsAdmin(userId: string): void {
  if (typeof window === "undefined") return

  const admins = JSON.parse(localStorage.getItem("adminUsers") || "[]")
  if (!admins.includes(userId)) {
    admins.push(userId)
    localStorage.setItem("adminUsers", JSON.stringify(admins))
  }
}

// Remove user from admin
export function removeUserFromAdmin(userId: string): void {
  if (typeof window === "undefined") return

  const admins = JSON.parse(localStorage.getItem("adminUsers") || "[]")
  const updatedAdmins = admins.filter((id: string) => id !== userId)
  localStorage.setItem("adminUsers", JSON.stringify(updatedAdmins))
}

// Get all teams
export function getAllTeams(): Team[] {
  if (typeof window === "undefined") return []

  return JSON.parse(localStorage.getItem("teams") || "[]")
}

// Get team by ID
export function getTeamById(teamId: string): Team | null {
  const teams = getAllTeams()
  return teams.find((team) => team.id === teamId) || null
}

// Create team
export function createTeam(name: string, description: string | undefined, creatorUserId: string): Team {
  const teams = getAllTeams()

  const newTeam: Team = {
    id: `team-${Date.now()}`,
    name,
    description,
    members: [
      {
        userId: creatorUserId,
        role: "OWNER",
      },
    ],
  }

  teams.push(newTeam)
  localStorage.setItem("teams", JSON.stringify(teams))

  return newTeam
}

// Add member to team
export function addTeamMember(teamId: string, userId: string, role: TeamRole): boolean {
  const teams = getAllTeams()
  const teamIndex = teams.findIndex((team) => team.id === teamId)

  if (teamIndex === -1) return false

  // Check if user is already a member
  const existingMemberIndex = teams[teamIndex].members.findIndex((member) => member.userId === userId)

  if (existingMemberIndex !== -1) {
    // Update role if user is already a member
    teams[teamIndex].members[existingMemberIndex].role = role
  } else {
    // Add new member
    teams[teamIndex].members.push({
      userId,
      role,
    })
  }

  localStorage.setItem("teams", JSON.stringify(teams))
  return true
}

// Remove member from team
export function removeTeamMember(teamId: string, userId: string): boolean {
  const teams = getAllTeams()
  const teamIndex = teams.findIndex((team) => team.id === teamId)

  if (teamIndex === -1) return false

  // Filter out the member to remove
  teams[teamIndex].members = teams[teamIndex].members.filter((member) => member.userId !== userId)

  localStorage.setItem("teams", JSON.stringify(teams))
  return true
}

// Check if user has permission for a specific action
export function hasPermission(userId: string, teamId: string, action: "view" | "edit" | "manage" | "delete"): boolean {
  const team = getTeamById(teamId)
  if (!team) return false

  const member = team.members.find((m) => m.userId === userId)
  if (!member) return false

  switch (action) {
    case "view":
      // All members can view
      return true
    case "edit":
      // MEMBER and above can edit
      return ["OWNER", "ADMIN", "MEMBER"].includes(member.role)
    case "manage":
      // ADMIN and OWNER can manage
      return ["OWNER", "ADMIN"].includes(member.role)
    case "delete":
      // Only OWNER can delete
      return member.role === "OWNER"
    default:
      return false
  }
}

