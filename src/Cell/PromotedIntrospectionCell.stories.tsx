import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell } from './PromotedIntrospectionCell'
import { Card } from '@mui/material'

export default {
  title: 'PromotedIntrospectionCell',
  component: PromotedIntrospectionCell,
} as ComponentMeta<typeof PromotedIntrospectionCell>

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospectionCell {...args} />
  </div>
)

export const Primary = Template.bind({})

Primary.args = {
  introspectionPayload: JSON.stringify({
    userId: 'some-user',
    logUserId: 'some-log-user',
    requestId: 'some-request',
    insertionId: 'some-insertion',
    promotedRank: 2,
    retrievalRank: 3,
    pClick: 0.07,
    pPurchase: 0.01,
    queryRelavance: 0.5,
    personalization: 'some personalization',
  }),
  renderItem: () => (
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
  ),
}
