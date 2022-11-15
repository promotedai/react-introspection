import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Card } from '@material-ui/core'
import { withPromotedIntrospection } from './withPromotedIntrospection'
import { mockData } from './PromotedIntrospection/mocks'
import {
  PromotedIntrospectionProvider,
  PromotedIntrospectionProviderArgs,
} from './PromotedIntrospection/PromotedIntrospectionProvider'
import { PromotedIntrospectionBannerShell } from './PromotedIntrospectionBannerShell'

const BaseComponent = ({ contentId }: { contentId: string }) => (
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
    Some search result with contentId {contentId}
  </Card>
)

const WithPromotedIntrospection = withPromotedIntrospection()(BaseComponent)

export default {
  title: 'withPromotedIntrospection',
  component: WithPromotedIntrospection,
} as ComponentMeta<typeof WithPromotedIntrospection>

const Template: ComponentStory<typeof WithPromotedIntrospection> = (args: PromotedIntrospectionProviderArgs) => (
  <PromotedIntrospectionProvider {...args}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <PromotedIntrospectionBannerShell logUserId={args.logUserId} />
      <WithPromotedIntrospection contentId="content_id2" />
      <WithPromotedIntrospection contentId="content_id1" />
    </div>
  </PromotedIntrospectionProvider>
)

export const Default = Template.bind({})
Default.parameters = {
  mockData,
}

Default.args = {
  isIntrospectionEnabled: true,
  logUserId: 'test-loguserid',
  endpoint: 'www.foo.fake',
  experimentDetails: [
    {
      label: 'Log User ID',
      value: 'test-loguserid',
    },
    {
      label: 'User ID',
      value: 'prm-eric-schneider',
    },
  ],
  metadata: [
    {
      label: 'Log User ID',
      value: 'test-loguserid',
    },
    {
      label: 'User ID',
      value: 'prm-eric-schneider',
    },
  ],
}

export const Controlled: ComponentStory<typeof WithPromotedIntrospection> = (
  args: PromotedIntrospectionProviderArgs
) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <PromotedIntrospectionProvider {...args}>
        <WithPromotedIntrospection
          introspectionOpen={isOpen}
          contentId="content_id2"
          onIntrospectionClose={() => setIsOpen(false)}
        />
      </PromotedIntrospectionProvider>
    </div>
  )
}

Controlled.parameters = {
  mockData,
}
Controlled.args = {
  isIntrospectionEnabled: true,
  logUserId: 'test-loguserid',
  endpoint: 'www.foo.fake',
}

export const DisplayRight = Template.bind({})
DisplayRight.parameters = {
  mockData,
}
DisplayRight.args = {
  introspectionEnabled: true,
  item: {
    contentId: 'content_id2',
    logUserId: 'test-loguserid',
  },
  introspectionDirection: 'right',
}
