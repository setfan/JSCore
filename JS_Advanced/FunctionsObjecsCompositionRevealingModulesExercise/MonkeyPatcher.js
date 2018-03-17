function solve (input) {
  switch (input) {
    case 'upvote':
      this.upvotes += 1;
      break;
    case 'downvote':
      this.downvotes += 1;
      break;
    case 'score':
      return score(this);
  }

  function score (obj) {
    let modifier = 0;
    if (obj.upvotes + obj.downvotes > 50) {
      modifier = Math.ceil(Math.max(obj.upvotes, obj.downvotes) * 0.25);
    }
    let score = obj.upvotes - obj.downvotes;
    let rating = calculateRating(obj.upvotes, obj.downvotes, score);
    return result = [
      obj.upvotes + modifier,
      obj.downvotes + modifier,
      score,
      rating];
  }

  function calculateRating (upvotes, downvotes, score) {
    let total = upvotes + downvotes;
    if (total >= 10) {
      if (upvotes / total > 0.66) {
        return 'hot';
      } else if (score >= 0 && (upvotes > 100 || downvotes > 100)) {
        return 'controversial';
      } else if (score < 0) {
        return 'unpopular';
      }
    }
    return 'new';
  }
}

let obj = {
  id: '3',
  author: 'emil',
  content: 'wazaaaaa',
  upvotes: 100,
  downvotes: 100,
};
solve.call(obj, 'upvote');
solve.call(obj, 'downvote');
console.log(solve.call(obj, 'score'));
for (let i = 0; i < 50; i++) {
  solve.call(obj, 'downvote');
}
console.log(solve.call(obj, 'score'));