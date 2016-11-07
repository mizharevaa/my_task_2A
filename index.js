import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'If you want to summarize - type url+/sum?a=2&b=3',
  });
});

app.get('/sum', (req, res) => {
  try {
    const validatedInput = findNumsInReq(req.query);
    const errorMessageForUserInput = validatedInput.errMsg;
    
    if (errorMessageForUserInput) {
      return res.send(errorMessageForUserInput);
    };
    if (validatedInput.enteredValues.length === 0) {
       const zero = 0;       
       return res.send(zero.toString()); 
    }; 
    return res.send(summarize(validatedInput.enteredValues, 2).toString());
  } 
  catch (err) {
    console.log(err);
    return res.json({err});
  }
});


app.listen(3000, () => {
  console.log('Task 2A listen port 3000!');
});

/*
  Функция анализирует входящие параметры запроса на предмет наличия чисел. 
  Возвращает объект с сообщением пользователю об ошибке при отсутствии чисел в строке ("errMsg") 
  и массив найденных чисел ("enteredValues"). 
*/
function findNumsInReq(reqQuery) {
  var errMsg = '';
  var enteredValues = [];
  const RegExp_ForInput = new RegExp('[0-9]([0-9]?){10}');
  for(const param in reqQuery) {
      const finded_number = reqQuery[param].match(RegExp_ForInput);
      if (finded_number) {
        enteredValues.push(finded_number[0]);
      }else{
        errMsg += `Параметр ${param} не содержит числа! `;
      };
  };
  console.log(enteredValues);
  return {'errMsg' : errMsg,'enteredValues' : enteredValues}
}

/*
  Функция суммирует переданные в "valuesForSum" значения. 
  При получении массива значений для сложения анализирует параметр "slicer" и обрезает
  массив до указанного количества элементов. 
*/
function summarize(valuesForSum, slicer = 0) {
  return valuesForSum.slice(0, slicer === 0 ? valuesForSum.length - 1 : slicer).reduce((prev, curr)=>{return (+prev) + (+curr)});
}