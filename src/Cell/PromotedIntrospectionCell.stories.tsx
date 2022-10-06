import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PromotedIntrospectionCell, PromotedIntrospectionCellTrigger } from './PromotedIntrospectionCell'
import { Card } from '@material-ui/core'

export default {
  title: 'PromotedIntrospectionCell',
  component: PromotedIntrospectionCell,
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

Default.args = {
  item: {
    insertionId: 'abc',
  },
}

export const CustomTrigger = Template.bind({})

CustomTrigger.args = {
  introspectionEndpoint: 'www.foo.com',
  item: {
    insertionId: 'abc',
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
      <PromotedIntrospectionCell
        isOpen={isOpen}
        disableDefaultTrigger
        item={{ insertionId: 'abc' }}
        introspectionEndpoint="www.foo.com"
        onClose={() => setIsOpen(false)}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}

export const TriggerOverlay = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospectionCell
        item={{ insertionId: 'abc' }}
        introspectionEndpoint="www.foo.com"
        triggerType={PromotedIntrospectionCellTrigger.OverlayAlways}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}

export const TriggerOverlayOnHover = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospectionCell
        item={{ insertionId: 'abc' }}
        introspectionEndpoint="www.foo.com"
        triggerType={PromotedIntrospectionCellTrigger.OverlayOnMouseEnter}
      >
        <SearchItem />
      </PromotedIntrospectionCell>
    </div>
  )
}
