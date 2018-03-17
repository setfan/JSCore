class MailBox{
  constructor (){
    this._data = [];
  }

  get messageCount(){
    return this._data.length;
  }

  addMessage(subject, text){
    this._data.push({subject, text});
    return this;
  }

  deleteAllMessages(){
    this._data.length = 0;
  }

  findBySubject(substr){
    return this._data.filter(el => el.subject.includes(substr));
  }

  toString(){
    return this._data.length === 0 ? ' * (empty mailbox)' : this._data.map(e => ` * [${e.subject}] ${e.text}`).join('\n');
  }

}

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
  JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
  JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
  new MailBox()
    .addMessage("Subj 1", "Msg 1")
    .addMessage("Subj 2", "Msg 2")
    .addMessage("Subj 3", "Msg 3")
    .toString());
