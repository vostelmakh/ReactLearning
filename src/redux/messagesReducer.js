const UPDETE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
  dialogs: [
    { id: 1, time: "11:26", name: "Jessica Koel", photo: "https://i.imgur.com/aq39RMA.jpg",
      newMessageText: "",
      messages: [
        {
          "date": 1610387607,
          "from_id": 214826664,
          "id": 427660,
          "out": 1,
          "text": "Спасибо большое"
        },
        {
          "date": 1610387550,
          "from_id": 1,
          "id": 427659,
          "out": 0,
          "text": "С днём рождения,братушка!всех благ тебе!"
        },
        {
          "date": 1610295934,
          "from_id": 214826664,
          "id": 427501,
          "out": 1,
          "text": "Та не за что, буду стараться"
        },
        {
          "date": 1610295896,
          "from_id": 1,
          "id": 427500,
          "out": 0,
          "text": "Владик,ты молодец!Спасибо за игру!"
        }
      ]
    },
    { id: 2, time: "12:26", name: "Komeial Bolger", photo: "https://i.imgur.com/eMaYwXn.jpg", 
    newMessageText: "",
    messages: [
      {
        "date": 1610387607,
        "from_id": 214826664,
        "id": 427660,
        "out": 1,
        "text": "Привет, все хорошо"
      },
      {
        "date": 1610387550,
        "from_id": 2,
        "id": 427659,
        "out": 0,
        "text": "Ку, как дела?"
      }
      ]
    },
    { id: 3, time: "8:26", name: "Tamaara Suiale", photo: "https://i.imgur.com/zQZSWrt.jpg",
      newMessageText: "",
      messages: [
        {
          "date": 1610387607,
          "from_id": 214826664,
          "id": 427660,
          "out": 1,
          "text": "Просто супер"
        },
        {
          "date": 1610387550,
          "from_id": 3,
          "id": 427659,
          "out": 0,
          "text": "Как тебе эта песня?"
        }
      ] 
    },
  ],
}

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDETE_NEW_MESSAGE_TEXT:

      state.dialogs.forEach(element => element.id === action.chat_id ? element.newMessageText = action.text : console.log(action.chat_id) )
      break;
    
    case SEND_MESSAGE:
      let text = ""

      state.dialogs.forEach(element => element.id === action.chat_id ? text = element.newMessageText : console.log("") )

      let newMessage = {
        "date": Date.now(),
        "from_id": 214826664,
        "id": Math.floor(Math.random() * 100000 + 1),
        "out": 1,
        "text": text
      }

      state.dialogs.forEach(element => element.id === action.chat_id ? element.messages.push(newMessage) : console.log("") )
      state.dialogs.forEach(element => element.id === action.chat_id ? element.newMessageText = '' : console.log("") )
      break;

    default:
      return state
  }
  return state;
}

export const sendMessageActionCreator = (chat_id) => {
  return { type: 'SEND-MESSAGE', chat_id: chat_id }
}

export const updateNewMessageTextActionCreator = (chat_id, text ) => {
  return { type: 'UPDATE-NEW-MESSAGE-TEXT', chat_id: chat_id, text: text }
}

export default messagesReducer;