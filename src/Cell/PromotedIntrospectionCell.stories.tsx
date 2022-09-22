import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell } from './PromotedIntrospectionCell'
import { Card } from '@mui/material'

export default {
  title: 'PromotedIntrospectionCell',
  component: PromotedIntrospectionCell,
} as ComponentMeta<typeof PromotedIntrospectionCell>

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospectionCell {...args}>
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
        Some search result
      </Card>
    </PromotedIntrospectionCell>
  </div>
)

export const Default = Template.bind({})

Default.args = {
  introspectionEndpoint: 'www.foo.com',
  item: {
    insertionId: 'abc',
  },
}
