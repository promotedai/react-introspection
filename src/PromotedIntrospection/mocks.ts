export const mockData = [
  {
    url: 'www.foo.fake/v1/introspectiondata/byloguserid/test-loguserid',
    method: 'GET',
    status: 200,
    response: [
      {
        insertion_data: {
          content_id1: {
            feature_floats: {
              '1002': 29,
              '1065': 0.059785083,
              '1069': 0.2382904,
              '1084': 0.004595,
              '1086': 63,
              '1210': 1,
              '200002': 0.010844535,
              '201000': 0.1975123,
            },
            feature_ints: {},
            retrieval_rank: 12,
            retrieval_score: 1.0721853,
            insertion_id: 'insertion_id1',
          },
          content_id2: {
            feature_floats: {
              '1002': 54,
              '1065': 0.06305049,
              '1069': 0.15629323,
              '1084': 0.0074766,
              '1086': 36,
              '1210': 89,
              '200002': 0.0133437775,
              '201000': 0.08892447,
            },
            feature_ints: {},
            retrieval_rank: 16,
            retrieval_score: 0.9890527,
            insertion_id: 'insertion_id2',
          },
        },
        request_id: 'request_id1',
      },
    ],
  },
]
