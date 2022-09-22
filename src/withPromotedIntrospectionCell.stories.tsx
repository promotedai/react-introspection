import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell } from './Cell/PromotedIntrospectionCell'
import { Card } from '@mui/material'
import { withPromotedInspection } from './withPromotedInspection'

const BaseComponent = ({ item }: { item: { insertionId: string } }) => (
  <Card
    sx={{ height: 300, width: 200 }}
    style={{
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      margin: 'auto',
      width: '100px',
    }}
  >
    Some search result with insertionId {item.insertionId}
  </Card>
)

const WithPromotedIntrospectionCell = withPromotedInspection(BaseComponent, 'www.foo.com')

export default {
  title: 'withPromotedIntrospectionCell',
  component: WithPromotedIntrospectionCell,
} as ComponentMeta<typeof WithPromotedIntrospectionCell>

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <WithPromotedIntrospectionCell {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  introspectionEnabled: true,
  item: {
    insertionId: 'abc',
  },
}
