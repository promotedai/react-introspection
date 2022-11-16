import { IntrospectionData } from './PromotedIntrospection/types'

enum Rank {
  PERSONALIZE_CONV_MODEL_RANK = 'PERSONALIZE_CONV_MODEL_RANK',
  ENGAGEMENT_MODEL_RANK = 'ENGAGEMENT_MODEL_RANK',
  RETRIEVAL_RANK = 'RETRIEVAL_RANK',
}

enum Statistic {
  CTR_30_DAY = 'CTR_30_DAY',
  CVR_30_DAY = 'CVR_30_DAY',
  PERSONALIZATION_SCORE = 'PERSONALIZATION_SCORE',
  MODEL_SCORE = 'MODEL_SCORE',
  P_NAVIGATES = 'P_NAVIGATES',
  P_CONV_GIVEN_NAVIGATE = 'P_CONV_GIVEN_NAVIGATE',
}

const featureIds = {
  [Rank.PERSONALIZE_CONV_MODEL_RANK]: '1002',
  [Rank.ENGAGEMENT_MODEL_RANK]: '1086',
  [Rank.RETRIEVAL_RANK]: '1210',

  [Statistic.CTR_30_DAY]: '1065',
  [Statistic.CVR_30_DAY]: '1069',
  [Statistic.PERSONALIZATION_SCORE]: '1084',
  [Statistic.MODEL_SCORE]: '1211',
  [Statistic.P_NAVIGATES]: '200002',
  [Statistic.P_CONV_GIVEN_NAVIGATE]: '201000',
}

const ranksOrder = [Rank.PERSONALIZE_CONV_MODEL_RANK, Rank.ENGAGEMENT_MODEL_RANK, Rank.PROMOTED_RANK]

const statisticsOrder = [
  Statistic.P_NAVIGATES,
  Statistic.P_CONV_GIVEN_NAVIGATE,
  Statistic.CTR_30_DAY,
  Statistic.CVR_30_DAY,
  Statistic.PERSONALIZATION_SCORE,
  Statistic.MODEL_SCORE,
]

const decimalFormatter = (value: any) => {
  if (typeof value === 'string') {
    return parseFloat(value).toFixed(3)
  } else if (typeof value === 'number') {
    return value.toFixed(3)
  } else {
    return value
  }
}

const selector =
  (featureId: string, formatter?: (value: number | string | undefined) => string) =>
  (data: IntrospectionData): string | number | undefined => {
    const feature = data.feature_floats[featureId]

    return typeof formatter === 'function' ? formatter(feature) : feature
  }

const fieldConfig = {
  [Rank.PERSONALIZE_CONV_MODEL_RANK]: {
    label: 'Conversion Model Rank',
    value: selector(featureIds[Rank.PERSONALIZE_CONV_MODEL_RANK]),
  },
  [Rank.ENGAGEMENT_MODEL_RANK]: {
    label: 'All Engagement Model Rank',
    value: selector(featureIds[Rank.ENGAGEMENT_MODEL_RANK]),
  },
  [Rank.PROMOTED_RANK]: {
    label: 'Promoted Rank',
    value: selector(featureIds[Rank.PROMOTED_RANK]),
  },
  [Statistic.P_NAVIGATES]: {
    label: 'p(Navigate)',
    value: selector(featureIds[Statistic.P_NAVIGATES], decimalFormatter),
  },
  [Statistic.P_CONV_GIVEN_NAVIGATE]: {
    label: 'p(Conv | Navigate)',
    value: selector(featureIds[Statistic.P_CONV_GIVEN_NAVIGATE], decimalFormatter),
  },
  [Statistic.CTR_30_DAY]: {
    label: '30-Day CTR',
    value: selector(featureIds[Statistic.CTR_30_DAY], decimalFormatter),
  },
  [Statistic.CVR_30_DAY]: {
    label: '30-Day CVR',
    value: selector(featureIds[Statistic.CVR_30_DAY], decimalFormatter),
    formatter: decimalFormatter,
  },
  [Statistic.PERSONALIZATION_SCORE]: {
    label: 'Personalization Score',
    value: selector(featureIds[Statistic.PERSONALIZATION_SCORE], decimalFormatter),
  },
  [Statistic.MODEL_SCORE]: {
    label: 'Model Score',
    value: selector(featureIds[Statistic.MODEL_SCORE], decimalFormatter),
  },
}

export const ranks = ranksOrder.map((rank) => fieldConfig[rank])
export const statistics = statisticsOrder.map((statistic) => fieldConfig[statistic])
