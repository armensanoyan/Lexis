const path = require('path')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database')

const pathToDictionary = path.join(__dirname, 'data.json')

const loadData = () => JSON.parse(fs.readFileSync(pathToDictionary, 'utf8'))

const saveData = (dictionary) => fs.writeFileSync(pathToDictionary, JSON.stringify(dictionary, null, 1))

const insert = (data) => {
  console.log('insert data:', data)
  const dictionary = loadData()
  data.id = dictionary.length + 1
  dictionary.push(data)
  // console.log('data', data);
  saveData(dictionary)
  return data
}

// const find = (word = '') => loadData().map(item => (item.word || '').toLowerCase().includes(word.toLowerCase()))

const find = (word = '') => loadData().find((val) => val.word === word) || 'undiefined'

const findById = (word = '') => loadData().find((val) => val.id === word)

const remove = (id) => {
  const dic = loadData()
  const item = dic.find(item => item.id === id)
  const indexOf = dic.indexOf(item)
  loadData().splice(indexOf, 1)
  saveData()
}

const update = (data) => {
  console.log(data.id)
  const dictionary = loadData()
  const item = dictionary.find(item => item.id === data.id)
  if (!item) throw Error(`No item in dictioniry with id '${data.id}'`)
  const _data = Object.assign({}, data, item)

  remove(item.id)
  insert(_data)
  saveData(dictionary)
  return data
}

module.exports = {
  insert,
  update,
  find,
  loadData,
  findById
}
