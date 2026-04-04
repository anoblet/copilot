# Task

## Tools

- #askQuestions
- #context7
- #runSubagent
- #serena
- #todo

## Instructions

**Always use the #askQuestions tool if you have any uncertainties about the task or the application. Do not make assumptions. Clarify first.**

Before you begin:

- Research [.copilot/sessions/](.copilot/sessions/)

Then, follow these steps:

Note: Skills should be project agnostic and not contain references to this project

- Resources
  - https://agentskills.io/home
  - https://agentskills.io/specification

Create the following skills:

- Skills
  - OpenScad
    - Path: 'copilot/.github/skills/openscad/'
    - Resources
      - https://github.com/openscad/openscad
      - https://en.wikibooks.org/wiki/OpenSCAD_User_Manual
      - https://github.com/BelfrySCAD/BOSL2/
      - https://github.com/BelfrySCAD/BOSL2/wiki
    - Features
      - Accept a reference image as input and generate OpenSCAD code to create a 3D model that resembles the image.
      - Use the executable in the `bin` directory to validate the generated OpenSCAD code and ensure it produces the expected 3D model.
      - Implement a feedback loop where the skill can iteratively refine the generated OpenSCAD code based on the validation results and user feedback to improve the accuracy of the 3D model.
      - The `tmp` directory should be used when itterating on the generated OpenSCAD code
