# Storybook glossary

Short, plain-English definitions of the words used in this project. Each term has a one-word summary first.

## Storybook basics

| Term | In one word | Meaning |
| --- | --- | --- |
| Storybook | Workshop | A tool to build, view and test UI components outside the app. |
| Component | Part | A reusable piece of UI, like a button. |
| Story | State | One named example of a component with specific props, like "Loading". |
| Meta | Settings | The `export default` object shared by all stories in a file. |
| Args | Inputs | The props a story passes to the component. |
| ArgTypes | Controls | How each prop can be edited in the Controls panel. |
| Decorator | Wrapper | A function that puts a story inside something, like a theme or a layout. |
| Parameters | Options | Static settings for Storybook features, like `layout: 'centered'`. |
| Globals | Toolbar | Values picked in the toolbar that affect every story, like the theme. |
| Play function | Script | Code that runs after a story renders: it clicks, types and checks. |
| `fn()` | Spy | A fake function that records every call, shown in the Actions panel. |
| Autodocs | Docs | A page generated from the component's types and comments. |
| Addon | Plug-in | A package that adds a panel or feature to Storybook. |
| Canvas | Stage | The area where the story is drawn. |

## Design system

| Term | In one word | Meaning |
| --- | --- | --- |
| Design token | Variable | A named design value, like `--color-ink: #1f1f2b`. |
| Theme | Palette | A set of values for the same tokens, like light and dark. |
| Variant | Style | A visual option of one component, like `primary` or `secondary`. |
| Presentational component | Dumb | Renders only from props. No API calls, no global state. |
| Container component | Smart | Holds state and data, then passes props to presentational components. |
| Edge case | Extreme | A rare but real situation: very long text, empty data, an error. |

## Testing

| Term | In one word | Meaning |
| --- | --- | --- |
| Unit test | Logic | Checks one small piece of code in isolation. |
| Interaction test | Behavior | Checks what happens when a user clicks or types. |
| Visual regression test | Screenshot | Compares a new screenshot of a story with the approved one. |
| Accessibility (a11y) | Inclusion | Making UI usable for everyone, including keyboard and screen-reader users. |
| Mock | Fake | A stand-in for a real service or data. |

## Delivery

| Term | In one word | Meaning |
| --- | --- | --- |
| CI | Automation | Tests that run automatically on every push or pull request. |
| Static build | Bundle | `storybook build` turns Storybook into plain HTML/JS files. |
| GitHub Pages | Hosting | Free hosting for static sites, straight from a GitHub repo. |
| Workflow | Recipe | A YAML file in `.github/workflows` that tells GitHub Actions what to run. |

## Useful phrases

- "Every component ships with its stories." → No component is merged without stories.
- "Stories are the single source of truth for UI states." → If a state matters, it has a story.
- "The component is presentational; the container owns the data." → UI and data logic are kept apart.
