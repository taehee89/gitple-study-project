import express from 'express';
import _ from 'lodash';
const SummarizerManager = require('node-summarizer').SummarizerManager;
import {contentsModelNm, contentsSchema} from '../js/db';
const router = express.Router();
import mongoose from 'mongoose';

const db = mongoose.model(contentsModelNm, contentsSchema);

router.get('/', (req, res, next) => {
  const user_id: string = req.body.user_id;
  db.find({user_id: user_id}, function(err, contents){
    if(err) res.status(500).json({error: err});
    const result = textRank(contents);
    res.json(result);
  })
});

module.exports = router;

function textRank(contents: any) {
  let wordArray: string[][] = [];
  contents.forEach((item: any) => {
    let Summarizer = new SummarizerManager(item.content, 10);
    let summary = Summarizer.getSummaryByFrequency().weighted_map;
    let tmpArray: string[] = Array.from( summary.keys() );
    wordArray.push(tmpArray);
  });

  const deduplicationArray: string[] = [];
  _(wordArray).forEach((item) => {
      _(_.unionBy(item)).forEach((n) => {
        deduplicationArray.push(n)
      })
  })

  let result: any[] = []
  const rankObj = _.countBy(deduplicationArray);
  const keys: string[] = Object.keys(rankObj);
  keys.map((key: string) => {
    const tmpObj = {
      word: key,
      count : rankObj[key]
    }
    result.push(tmpObj)
  })

  result = _.orderBy(result, ['count'], ['desc']).filter((item, index) => item.word.length > 1 && index < 5);

  return result;
}