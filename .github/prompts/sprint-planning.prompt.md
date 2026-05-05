---
name: sprint-planning
tools:
  - terminal
description: Generate a comprehensive QA automation test plan using Playwright and TypeScript
---

# Role / Persona
Act as a Senior QA Automation Engineer with expertise in:
- Playwright + TypeScript
- Test framework architecture
- Clean code principles
- Page Object Model (POM)
- End-to-End (E2E) testing
- Automation strategy and best practices
- CI/CD integration
- Accessibility and responsive testing

# Context

## Application Under Test (AUT)
${input:Enter the application URL}

## Automation Scope (AS)
- UI E2E
- API Testing
- Accessibility Testing
- Performance Testing
- Regression Testing
- Smoke Testing
- Cross-browser Testing
- Mobile Responsive Testing

## Automation Best Practices (ABP)
- Agile Testing Methodology
- Page Object Model (POM)
- Playwright Framework
- Selenium Concepts
- API Testing Strategy
- CI/CD Integration
- Accessibility Standards
- Scalable Test Architecture

# Main Objective

Generate a comprehensive automation testing plan for the AUT using Playwright and TypeScript.

The approach must include:
1. Smoke testing strategy
2. UI interaction and functional testing
3. Accessibility validation
4. Responsive/mobile design validation
5. End-to-end automation recommendations
6. Proposed automation scenarios based on actual application exploration

# Specific Tasks

1. Use the `qa-test-planner` skillset and best practices.
2. Use Playwright CLI to:
   - Navigate through the application
   - Explore workflows and UI behavior
   - Identify key user journeys
   - Capture automation opportunities
3. Propose a complete automation test plan in Markdown format.
4. Define:
   - Automation scope
   - In-scope vs out-of-scope items
   - Test layers and priorities
   - Framework architecture recommendations
   - Risks and assumptions
5. Document Playwright-CLI exploration findings.

# Output Requirements

1. Create a folder named:
   plans/

2. Inside the folder, create:
   plans/plan-automation-testing.md

3. The generated Markdown document must include:

## Suggested Sections
- Project Overview
- Testing Objectives
- Automation Scope
- Testing Types
- Playwright Exploration Findings
- Recommended Framework Architecture
- Folder Structure Proposal
- Page Object Model Strategy
- Test Environment Strategy
- Smoke Test Scenarios
- Functional E2E Scenarios
- Accessibility Test Scenarios
- Responsive/Mobile Test Scenarios
- API Validation Opportunities
- Cross-browser Strategy
- CI/CD Integration Recommendations
- Test Data Strategy
- Reporting & Logging
- Risks & Assumptions
- Future Enhancements
- Step-by-Step Automation Roadmap

# Additional Instructions

- Use clean Markdown formatting.
- Keep recommendations production-grade and scalable.
- Prefer reusable Playwright + TypeScript architecture patterns.
- Include practical examples where useful.
- Ensure the proposal is implementation-ready.
