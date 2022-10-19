import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospection, PromotedIntrospectionTrigger } from './PromotedIntrospection'
import { Card } from '@material-ui/core'
import { mockData } from './mocks'

export default {
  title: 'PromotedIntrospection',
  component: PromotedIntrospection,
} as ComponentMeta<typeof PromotedIntrospection>

const SearchItem = () => {
  return (
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
  )
}

const Template: ComponentStory<typeof PromotedIntrospection> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospection {...args}>
      <SearchItem />
    </PromotedIntrospection>
  </div>
)

export const Default = Template.bind({})
Default.parameters = { mockData }

Default.args = {
  endpoint: 'www.foo.com',
  apiKey: 'api-key',
  item: {
    contentId: 'content_id2',
    logUserId: 'test-loguserid',
  },
}

export const CustomTrigger = Template.bind({})
CustomTrigger.parameters = { mockData }
CustomTrigger.args = {
  endpoint: 'www.foo.com',
  apiKey: 'api-key',
  item: {
    contentId: 'content_id2',
    logUserId: 'test-loguserid',
  },
  renderTrigger: (onTrigger: () => any) => {
    return (
      <button style={{ position: 'absolute', top: 5, left: 5 }} onClick={onTrigger}>
        trigger
      </button>
    )
  },
}

export const Controlled = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <PromotedIntrospection
        isOpen={isOpen}
        disableDefaultTrigger
        item={{ logUserId: 'test-loguserid', contentId: 'content_id2' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        onClose={() => setIsOpen(false)}
      >
        <SearchItem />
      </PromotedIntrospection>
    </div>
  )
}
Controlled.parameters = { mockData }

export const TriggerOverlay = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospection
        item={{ logUserId: 'test-loguserid', contentId: 'content_id2' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        triggerType={PromotedIntrospectionTrigger.Overlay}
      >
        <SearchItem />
      </PromotedIntrospection>
    </div>
  )
}
TriggerOverlay.parameters = { mockData }

export const TriggerOverlayOnHover = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospection
        item={{ logUserId: 'test-loguserid', contentId: 'content_id1' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        triggerType={PromotedIntrospectionTrigger.OverlayOnHover}
      >
        <SearchItem />
      </PromotedIntrospection>
    </div>
  )
}
TriggerOverlayOnHover.parameters = { mockData }
