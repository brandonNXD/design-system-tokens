# Claude Code to Figma

## Project Overview
This project is a design-to-code and code-to-Figma workflow environment. HTML files are built here to be captured into Figma designs using the `figma-remote-mcp` server.

## Dev Server
A local HTTP server runs on **port 3456** serving files from this directory.

Start it with:
```
python3 serve.py
```

The preview server is managed via the Claude Preview MCP (`mcp__Claude_Preview__*`). Always verify changes using the preview tools after editing HTML.

## Workflow: HTML → Figma
1. Edit or create an HTML file in this directory
2. Verify changes in the preview (`preview_screenshot`, `preview_snapshot`)
3. Call `mcp__figma-remote-mcp__generate_figma_design` with `outputMode: existingFile` and the target `fileKey`
4. Open the capture URL: `http://localhost:3456/<file>.html#figmacapture=<id>&...`
5. Poll until capture status is `completed`

## Workflow: Figma → HTML
1. Extract `fileKey` and `nodeId` from the Figma URL
2. Call `mcp__figma-remote-mcp__get_design_context` with both values
3. Adapt the returned React+Tailwind reference code into plain HTML/CSS
4. Verify in preview before pushing back

## Active Files
- `my-assistant.html` — Manager Assistant "My Assistant" page (Figma file: `7QDkMYzVfK7VNAAoNRTFzn`, node `39:2`)

# Design System: shadcn/ui

# Design System

## Source of Truth
- Figma file: https://www.figma.com/design/zLq6lMvGl2vmcD9M5rqSIW/Design-with-shadcn-ui--Community-?m=auto&t=pgnZcbsgLrb0kAOj-6
- Component library: shadcn/ui (`@/components/ui/`)

## Tokens
- Design tokens are in `src/design-tokens.json`
- Always use token names, never raw values (e.g. `color.brand.500` not `#6366f1`)

## Rules
- Always match spacing, colors, and typography from Figma
- Implement using shadcn/ui components where possible
- Use Tailwind for any custom styling needed