import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospection } from './PromotedIntrospection/PromotedIntrospection'
import { Card } from '@material-ui/core'
import withMock from '@nathancahill/storybook-addon-mock'
import { withPromotedIntrospection } from './withPromotedIntrospection'
import { mockData } from './PromotedIntrospection/mocks'

const BaseComponent = ({ item }: { item: { logUserId: string; contentId: string } }) => (
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
    Some search result with Log User Id {item.logUserId}
  </Card>
)

const WithPromotedIntrospection = withPromotedIntrospection({
  endpoint: 'www.foo.com',
  apiKey: 'apikey',
})(BaseComponent)

export default {
  title: 'withPromotedIntrospection',
  component: WithPromotedIntrospection,
  decorators: [withMock],
} as ComponentMeta<typeof WithPromotedIntrospection>

const Template: ComponentStory<typeof PromotedIntrospection> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <WithPromotedIntrospection {...args} />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  mockData,
}

Default.args = {
  introspectionEnabled: true,
  item: {
    contentId: 'content_id2',
    logUserId: 'test-loguserid',
  },
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <WithPromotedIntrospection
        introspectionOpen={isOpen}
        introspectionEnabled
        disableDefaultIntrospectionTrigger
        item={{ contentId: 'content_id2', logUserId: 'abc' }}
        onIntrospectionClose={() => setIsOpen(false)}
      />
    </div>
  )
}
Controlled.parameters = {
  mockData,
}
