import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell, PromotedIntrospectionCellTrigger } from './PromotedIntrospectionCell'
import { Card } from '@material-ui/core'
import withMock from '@nathancahill/storybook-addon-mock'
import { mockData } from './mocks'

export default {
  title: 'PromotedIntrospectionCell',
  component: PromotedIntrospectionCell,
  decorators: [withMock],
} as ComponentMeta<typeof PromotedIntrospectionCell>

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

const Template: ComponentStory<typeof PromotedIntrospectionCell> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <PromotedIntrospectionCell {...args}>
      <SearchItem />
    </PromotedIntrospectionCell>
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
  introspectionEndpoint: 'www.foo.com',
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
      <PromotedIntrospectionCell
        isOpen={isOpen}
        disableDefaultTrigger
        item={{ logUserId: 'test-loguserid', contentId: 'content-id2' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        onClose={() => setIsOpen(false)}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}
Controlled.parameters = { mockData }

export const TriggerOverlay = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospectionCell
        item={{ logUserId: 'test-loguserid', contentId: 'bcd' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        triggerType={PromotedIntrospectionCellTrigger.Overlay}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}
TriggerOverlay.parameters = { mockData }

export const TriggerOverlayOnHover = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospectionCell
        item={{ logUserId: 'test-loguserid', contentId: 'content_id1' }}
        endpoint="www.foo.com"
        apiKey="api-key"
        triggerType={PromotedIntrospectionCellTrigger.OverlayOnHover}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}
TriggerOverlayOnHover.parameters = { mockData }
