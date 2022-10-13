import { StatsPanelRow } from './PromotedIntrospection/StatsPanel'
import { IntrospectionData } from './PromotedIntrospection/types'

const featureMap = {
  P_NAVIGATES: 200002,
  P_PURCHASE_GIVEN_NAVIGATES: 201000,
}

export const ranks: StatsPanelRow[] = [
  {
    // Where does this come from?
    label: 'Promoted',
    value: (data: IntrospectionData) => data?.feature_ints?.retrieval_rank ?? '-',
  },
  {
    label: 'Retrieval',
    value: (data: IntrospectionData) => data?.feature_ints?.retrieval_rank ?? '-',
  },
]

export const statistics: StatsPanelRow[] = [
  {
    label: 'p(Navigates)',
    value: (data: IntrospectionData) => data?.feature_floats?.[featureMap['P_NAVIGATES']] ?? '-',
  },
  {
    label: 'p(Purchase | Navigates)',
    value: (data: IntrospectionData) => data?.feature_floats?.[featureMap['P_PURCHASE_GIVEN_NAVIGATES']] ?? '-',
  },
]
