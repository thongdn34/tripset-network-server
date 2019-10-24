- End point get all post
  ***GET /api/posts***
  Query parameters:
  + Filter by author
    ***GET /api/posts?userId=5dadf04fa8ef290bb9fd63e4***
  + Limit number of post, default is 10:
    ***GET /api/posts?limit=15***
  + Offset or skip number of post, default is 0:
    ***GET /api/posts?offset=0***