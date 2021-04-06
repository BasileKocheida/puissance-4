class Puissance4{

    constructor(arrayPlayer){
        this.rows = 6
        this.cols = 7
        this.game = document.querySelector('#game');
        this.joueurs = arrayPlayer
        this.joueurTurn = this.joueurs[0]
        this.gameBoard()
        this.listener()



    }

  gameBoard(){
  
      for (let col = 0; col < this.cols; col++) {
          let gameCol = document.createElement("div")

          this.game.appendChild(gameCol)
          gameCol.classList.add('col')
          gameCol.setAttribute('data-col', col)

          for (let row = 1; row < this.cols; row++) {
              let gameRow = document.createElement("div")
              gameCol.appendChild(gameRow)
              gameRow.classList.add('row', 'row-empty')
              gameRow.setAttribute('data-row', row)
          }
      }
  }

    listener(){

      const game = this.game
      let gameCols = document.querySelectorAll('.col');

      gameCols.forEach(function (col){
          col.addEventListener('click',function(e){

          })
      })
      this.game.addEventListener('click', (event)=>{
        // console.log(event.target.parentNode);
        // console.log(event.target.parentNode.children.length)
          for (let i = event.target.parentNode.children.length -1 ; i >=0 ; i--) {
              if (event.target.parentNode.children[i].classList.contains('row-empty')){
                  event.target.parentNode.children[i].classList.remove('row-empty')
                  event.target.parentNode.children[i].classList.add(this.joueurTurn.getColor())
                  this.checkWin(event.target.parentNode.children[i])
                  this.switchPlayer()
                  return
              }
          }
      })
  }

  switchPlayer(){

    if (this.joueurTurn == this.joueurs[0]){
        this.joueurTurn = this.joueurs[1]
    }else {
        this.joueurTurn = this.joueurs[0]
    }
  }

  checkWin(divJouer){
    //Vertical
    this.checkVertical(divJouer)

    //Horizontal
    let countHorizontal = 1
    countHorizontal = this.checkHorizontalGauche(divJouer, countHorizontal)
    this.checkHorizontalDroite(divJouer,countHorizontal)

    //Diagonal
    
    this.checkDiagonalInit(divJouer)

    this.counterDiagonalGauche = this.diagonaleHautGauche(divJouer, this.counterDiagonalGauche)
    this.diagonaleBasDroite(divJouer, this.counterDiagonalGauche)


    this.counterDiagonalDroite = this.diagonaleHautDroite(divJouer,this.counterDiagonalDroite)
    this.diagonaleBasGauche(divJouer,this.counterDiagonalDroite)
  }

  //VERTICLAL

  checkVertical(divJouer){
    let count = 1
    let idDivJouer = divJouer.getAttribute('data-row')-1
    let col = divJouer.parentNode.children


    while(col[idDivJouer +1] !== undefined){
      if(col[idDivJouer +1].classList.contains(this.joueurTurn.getColor()) == divJouer.classList.contains(this.joueurTurn.getColor())){
        count++
        divJouer = col[idDivJouer +1]
        idDivJouer = divJouer.getAttribute('data-row')-1
        if (count === 4) {
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
        }
      }else{
        break
      }
    }
  }

  //HORIZONTAL

  checkHorizontalDroite(divJouer, count){
    
    let idRowJouer = parseInt(divJouer.getAttribute('data-row')) // row de la col jouer
    let arrayRow = divJouer.parentNode.children // tout les row de notre col jouer
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones 
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer
    let countColAfter = 1
    
   // console.log("LOG DE IDROWJOUER -1", idRowJouer);
    
    while(arrayCol[idColJouer -countColAfter] !== undefined &&
          arrayCol[idColJouer -countColAfter].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor()) == arrayCol[idColJouer].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor())){
     
            // console.log(countColAfter);
            // console.log("!Valeur array Id coljouer -1",arrayCol[idColJouer -countColAfter].children[idRowJouer -1]);
            // console.log("Valeur array Id col cliquer",arrayCol[idColJouer]);
            countColAfter++
            count++
            // console.log("Compteur = ",count);
        if (count === 4) {
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
        }
    }
  }
  checkHorizontalGauche(divJouer, count){
  
    let idRowJouer = parseInt(divJouer.getAttribute('data-row')) // row de la col jouer
    let arrayRow = divJouer.parentNode.children // tout les row de notre col jouer
    let arrayCol = divJouer.parentNode.parentNode.children // toute les colones 
    let idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer
    let countColBefore = 1
    
   // console.log("LOG DE IDROWJOUER -1", idRowJouer);

 
    while(arrayCol[idColJouer +countColBefore] !== undefined &&
          arrayCol[idColJouer +countColBefore].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor()) == arrayCol[idColJouer].children[idRowJouer -1].classList.contains(this.joueurTurn.getColor())){
     
            // console.log(countColBefore);
            // console.log("!Valeur array Id coljouer -1",arrayCol[idColJouer +countColBefore].children[idRowJouer -1]);
            // console.log("Valeur array Id col cliquer",arrayCol[idColJouer]);
            countColBefore++
            count++
            // console.log("Compteur = ",count);
        if (count === 4) {
        
          return alert("Player " + this.joueurTurn.getColor() + " Win!")
        }
    }
    return count
  }

    //DIAGONALE


    checkDiagonalInit(divJouer){
      
      this.counterDiagonalDroite = 1
      this.counterDiagonalGauche = 1
      this.idRowJouer = parseInt(divJouer.getAttribute('data-row') -1) // row de la col jouer
      this.idColJouer = parseInt(divJouer.parentNode.getAttribute('data-col')) // id de la col jouer
      this.colJouer = divJouer.parentNode
      this.allCols = divJouer.parentNode.parentNode.children
   
      this.countColBefore = 1
      this.countColAfter= 1

    }

    diagonaleHautGauche(divJouer,count){
      
  
     

        while (this.allCols[this.idColJouer - this.countColBefore] !== undefined &&
          this.allCols[this.idColJouer - this.countColBefore].children[this.idRowJouer - this.countColBefore] !== undefined &&
          this.allCols[this.idColJouer - this.countColBefore].children[this.idRowJouer - this.countColBefore].classList.contains(this.joueurTurn.getColor()) === divJouer.classList.contains(this.joueurTurn.getColor())
        ){
          this.countColBefore++
          count ++
          if (count == 4) {
            alert('WINNER MA Gueule')
          }
        }
        return count
      

    }

    diagonaleBasDroite(divJouer,count){
      
        while (this.allCols[this.idColJouer + this.countColAfter] !== undefined &&
          this.allCols[this.idColJouer + this.countColAfter].children[this.idRowJouer + this.countColAfter] !== undefined &&
          this.allCols[this.idColJouer + this.countColAfter].children[this.idRowJouer + this.countColAfter].classList.contains(this.joueurTurn.getColor()) === divJouer.classList.contains(this.joueurTurn.getColor())
          ){
          this.countColAfter++
          count ++
          if (count == 4) {
            alert('WINNER MA Gueule')

          }

        }
    }
    
    diagonaleHautDroite(divJouer,count){
      while (this.allCols[this.idColJouer + this.countColAfter] !== undefined &&
        this.allCols[this.idColJouer + this.countColAfter].children[this.idRowJouer - this.countColAfter] !== undefined &&
        this.allCols[this.idColJouer + this.countColAfter].children[this.idRowJouer - this.countColAfter].classList.contains(this.joueurTurn.getColor()) === divJouer.classList.contains(this.joueurTurn.getColor())
      ){
        this.countColAfter++
        console.log(this.countColAfter);
        count ++
        console.log(count);
        if (count == 4) {
          alert('WINNER MA Gueule')
        }

        
      }
      return count
    }
    
    diagonaleBasGauche(divJouer,count){
      while (this.allCols[this.idColJouer - this.countColBefore] !== undefined &&
        this.allCols[this.idColJouer - this.countColBefore].children[this.idRowJouer + this.countColBefore] !== undefined &&
        this.allCols[this.idColJouer - this.countColBefore].children[this.idRowJouer + this.countColBefore].classList.contains(this.joueurTurn.getColor()) === divJouer.classList.contains(this.joueurTurn.getColor())
      ){
        this.countColBefore++
        console.log(this.countColBefore);
        count ++
        console.log(count);
        if (count == 4) {
          alert('WINNER MA Gueule')
        }
      }
    }


  
}