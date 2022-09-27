import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell } from './PromotedIntrospectionCell'
import { Card } from '@material-ui/core'

export default {
  title: 'PromotedIntrospectionCell',
  component: PromotedIntrospectionCell,
} as ComponentMeta<typeof PromotedIntrospectionCell>

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospectionCell {...args}>
      <Card
        style={{
          height: 300,
          width: 200,
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          margin: 'auto',
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
