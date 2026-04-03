class MemoryGame {
    constructor(boardId) {
        this.board = document.getElementById(boardId);
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }

    init(data) {
        this.board.innerHTML = "";
        const duplicated = [...data, ...data];
        const shuffled = this.shuffle(duplicated);
        this.createBoard(shuffled);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    createBoard(data) {
        data.forEach(item => {
            const card = new Card(item, this);
            this.board.appendChild(card.element);
        });
    }

    checkMatch() {
        if (
            this.firstCard.word === this.secondCard.word &&
            this.firstCard.type === this.secondCard.type
        ) {
            this.firstCard.setMatched();
            this.secondCard.setMatched();
            this.resetTurn();
        } else {
            setTimeout(() => {
                this.firstCard.flipBack();
                this.secondCard.flipBack();
                this.resetTurn();
            }, 800);
        }
    }

    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }
}