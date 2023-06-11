# Design

## Colors

|                        | Light           | Dark            |
| ---------------------- | --------------- | --------------- |
| Text                   | `gray-800`      | `gray-100`      |
| Secondary Text         | `gray-500`      | `gray-400`      |
| Active Text            | `text-blue-500` | `text-blue-400` |
| Background             | `white`         | `gray-900`      |
| Background of Elements | `white`         | `gray-800`      |
| Background of Hover    | `gray-50`       | `gray-700`      |

### Checks

Text: `text-gray-(?!800|100|500|400)`

Text (Not Gray): `text-(?!gray-)\w+-`

Background: `bg-gray-(?!900|800|50|700)`

Background (Not Gray): `bg-(?!gray-)\w+-`
