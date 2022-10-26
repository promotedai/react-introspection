export const mockData = [
  {
    url: 'www.foo.com/v1/introspectiondata/byloguserid/test-loguserid',
    method: 'GET',
    status: 200,
    response: [
      {
        insertion_data: {
          content_id1: {
            feature_floats: {
              '1001': 1,
              '1002': 1,
              '1003': 0,
              '1085': 1,
              '1086': 168,
              '1087': 167,
              '200002': 0.025494417,
              '201000': 0.012219667,
            },
            feature_ints: {},
            retrieval_rank: 12,
            retrieval_score: 1.0721853,
            insertion_id: 'insertion_id1',
          },
          content_id2: {
            feature_floats: {
              '1001': 1,
              '1002': 1,
              '1003': 0,
              '1085': 1,
              '1086': 168,
              '1087': 167,
              '200002': 0.025494417,
              '201000': 0.012219667,
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
