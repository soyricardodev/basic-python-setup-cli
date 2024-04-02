import { $ } from "bun";

await $`echo "Lets do some stuff!"`;

await $.cwd("/home/ricardo/sandbox/");

const projectFolderName = prompt("Enter a name for the proyect: ")
const defaultFolderName = "my-python-project"

const projectName = projectFolderName !== null ?
  projectFolderName.trim().toLowerCase().replace(/\s/g, "-") :
  defaultFolderName

await $`echo "Creating folder ${projectName}"`
await $`mkdir ${projectName}`

const pyprojectToml = `[project]
name = "${projectName}"
requires-python = ">=3.8"
dependencies = ["ruff"]

[tool.ruff]
line-length = 100
exclude = [
  ".git",
  "__pycache__",
  ".vscode",
  "venv",
  ".venv",
]
indent-width = 2

[tool.ruff.lint]
select = [
  # pycodestyle
  "E",
  # Pyflakes
  "F",
  # pyupgrade
  "UP",
  # flake8-bugbear
  "B",
  # flake8-simplify
  "SIM",
  # isort
  "I",
]

[tool.ruff.format]
indent-style = "tab"
docstring-code-format = true
`
const requirementsTxt = "ruff"

await $`cd ${projectName} && uv venv && echo "${pyprojectToml}" > pyproject.toml && echo "${requirementsTxt}" > requirements.txt`

console.log("Now activate the venv with:")
console.log("  source venv/bin/activate")
console.log("And install the dependencies with:")
console.log("  uv pip install -r requirements.txt") 

console.log("Done!")