import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell } from './Cell/PromotedIntrospectionCell'
import { Card } from '@material-ui/core'
import { withPromotedIntrospection } from './withPromotedIntrospection'

const BaseComponent = ({ item }: { item: { insertionId: string } }) => (
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
    Some search result with insertionId {item.insertionId}
  </Card>
)

const WithPromotedIntrospection = withPromotedIntrospection('www.foo.com')(BaseComponent)

export default {
  title: 'withPromotedIntrospectionCell',
  component: WithPromotedIntrospection,
} as ComponentMeta<typeof WithPromotedIntrospection>

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <WithPromotedIntrospection {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  introspectionEnabled: true,
  item: {
    insertionId: 'abc',
  },
}
