import * as fs from "fs";
import * as path from "path";

// Define paths
const componentsDir = path.join(process.cwd(), "components");
const appDir = path.join(process.cwd(), "app");

// List of components to check for references
const components = ["analytics-chart.tsx", "repository-settings.tsx", "repository-card.tsx", "sidebar-navigation-mobile.tsx", "code-block.tsx", "analytics-summary.tsx", "github-token-guide.tsx"];

// Track components and their usage
const componentUsage: Record<string, boolean> = {};

// Helper to check if a file contains a reference to a component
function fileContainsComponent(filePath: string, componentName: string): boolean {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    // Remove extension from component name for matching
    const baseName = componentName.replace(/\.[jt]sx?$/, "");

    // Check for imports or usages
    const importPattern = new RegExp(`import.*${baseName}.*from`);
    const usagePattern = new RegExp(`<${baseName}[\\s/>]`);

    return importPattern.test(content) || usagePattern.test(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

// Recursive function to scan directories for component usage
function scanDirectory(dirPath: string, componentName: string): boolean {
  let used = false;

  const entries = fs.readdirSync(dirPath, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and .next directories
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        const foundInSubdir = scanDirectory(fullPath, componentName);
        if (foundInSubdir) {
          used = true;
        }
      }
    } else if (/\.(j|t)sx?$/.test(entry.name)) {
      // Skip checking the component file itself
      if (entry.name !== componentName) {
        const foundInFile = fileContainsComponent(fullPath, componentName);
        if (foundInFile) {
          used = true;
          // Once found, we can break early
          break;
        }
      }
    }
  }

  return used;
}

// Main function to check component usage
function checkComponentUsage() {
  console.log("Scanning for unused components...");

  for (const component of components) {
    const componentPath = path.join(componentsDir, component);

    // Check if component file exists
    if (!fs.existsSync(componentPath)) {
      console.log(`Component ${component} not found, skipping.`);
      continue;
    }

    // Check if component is used in app or components directories
    const usedInApp = scanDirectory(appDir, component);
    const usedInComponents = scanDirectory(componentsDir, component);

    componentUsage[component] = usedInApp || usedInComponents;

    console.log(`${component}: ${componentUsage[component] ? "Used" : "UNUSED"}`);
  }

  // Summary
  const unusedComponents = Object.entries(componentUsage)
    .filter(([_, used]) => !used)
    .map(([name]) => name);

  console.log("\nSummary:");
  console.log("=======");
  console.log(`Total components checked: ${components.length}`);
  console.log(`Used components: ${components.length - unusedComponents.length}`);
  console.log(`Unused components: ${unusedComponents.length}`);

  if (unusedComponents.length > 0) {
    console.log("\nUnused components:");
    unusedComponents.forEach(name => console.log(`- ${name}`));

    console.log("\nTo remove these components, run:");
    unusedComponents.forEach(name => {
      console.log(`rm ${path.join("components", name)}`);
    });
  } else {
    console.log("\nNo unused components found!");
  }
}

// Run the check
checkComponentUsage();
