import Phaser from 'phaser';

export default class CheckersScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CheckersScene' });
  }

  preload() {
    // Load images for pieces and board
    this.load.image('board', '/crawler/assets/checker/board.png');
    this.load.image('blackPiece', '/crawler/assets/checker/black-piece.png');
    this.load.image('whitePiece', '/crawler/assets/checker/white-piece.png');
  }

  create() {
    // Create the board
    this.add.image(400, 300, 'board');

    // Define board settings
    this.tileSize = 75; // Each tile is 75x75 pixels
    this.offsetX = 50; // Offset for positioning the board on the screen
    this.offsetY = 50;

    // Create an array to hold the pieces
    this.pieces = this.add.group();

    // Initialize the game board with pieces
    this.board = this.createBoard();

    // Set up the pieces for both players
    this.setupPieces();

    // Allow pieces to be draggable
    this.input.setDraggable(this.pieces.getChildren());
    this.input.on('dragstart', this.onDragStart, this);
    this.input.on('drag', this.onDrag, this);
    this.input.on('dragend', this.onDragEnd, this);

    // Track whose turn it is (true = white's turn, false = black's turn)
    this.isWhiteTurn = true;
  }

  createBoard() {
    let board = [];
    for (let row = 0; row < 8; row += 1) {
      let boardRow = [];
      for (let col = 0; col < 8; col += 1) {
        boardRow.push(null);
      }
      board.push(boardRow);
    }
    return board;
  }

  setupPieces() {
    // Place white pieces
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if ((row + col) % 2 === 1) {
          this.createPiece(row, col, 'whitePiece');
        }
      }
    }

    // Place black pieces
    for (let row = 5; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        if ((row + col) % 2 === 1) {
          this.createPiece(row, col, 'blackPiece');
        }
      }
    }
  }

  createPiece(row, col, texture) {
    const x = this.offsetX + col * this.tileSize;
    const y = this.offsetY + row * this.tileSize;
    const piece = this.add.sprite(x, y, texture);
    piece.setData('row', row);
    piece.setData('col', col);
    piece.setData('texture', texture);

    // Add the piece to the board array
    this.board[row][col] = piece;

    // Add the piece to the group
    this.pieces.add(piece);
  }

  onDragStart(pointer, gameObject) {
    // Bring the dragged piece to the top
    gameObject.setDepth(10);
  }

  onDrag(pointer, gameObject, dragX, dragY) {
    // Update piece position as it is being dragged
    gameObject.x = dragX;
    gameObject.y = dragY;
  }

  onDragEnd(pointer, gameObject) {
    // Snap the piece back to the grid
    const droppedRow = Math.round(
      (gameObject.y - this.offsetY) / this.tileSize
    );
    const droppedCol = Math.round(
      (gameObject.x - this.offsetX) / this.tileSize
    );

    // Check if the drop is within board bounds
    if (this.isValidMove(gameObject, droppedRow, droppedCol)) {
      this.movePiece(gameObject, droppedRow, droppedCol);
      this.isWhiteTurn = !this.isWhiteTurn; // Switch turns
    } else {
      // Invalid move, snap back to original position
      const originalRow = gameObject.getData('row');
      const originalCol = gameObject.getData('col');
      gameObject.x = this.offsetX + originalCol * this.tileSize;
      gameObject.y = this.offsetY + originalRow * this.tileSize;
    }

    gameObject.setDepth(1);
  }

  isValidMove(piece, newRow, newCol) {
    // Ensure the move is within bounds and is on a dark square
    if (
      newRow < 0 ||
      newRow >= 8 ||
      newCol < 0 ||
      newCol >= 8 ||
      (newRow + newCol) % 2 === 0
    ) {
      return false;
    }

    // Ensure the target square is empty
    if (this.board[newRow][newCol] !== null) {
      return false;
    }

    // Check if the piece is moving in the correct direction
    const direction = piece.getData('texture') === 'whitePiece' ? -1 : 1;
    const originalRow = piece.getData('row');
    const originalCol = piece.getData('col');

    if (
      newRow === originalRow + direction &&
      Math.abs(newCol - originalCol) === 1
    ) {
      return true; // Simple move forward
    }

    // Check for capture
    const midRow = (originalRow + newRow) / 2;
    const midCol = (originalCol + newCol) / 2;
    const middlePiece = this.board[midRow][midCol];

    if (
      middlePiece &&
      middlePiece.getData('texture') !== piece.getData('texture')
    ) {
      if (
        newRow === originalRow + direction * 2 &&
        Math.abs(newCol - originalCol) === 2
      ) {
        // Capture move
        middlePiece.destroy();
        this.board[midRow][midCol] = null;
        return true;
      }
    }

    return false;
  }

  movePiece(piece, newRow, newCol) {
    // Update board state
    const originalRow = piece.getData('row');
    const originalCol = piece.getData('col');
    this.board[originalRow][originalCol] = null;
    this.board[newRow][newCol] = piece;

    // Update piece position
    piece.setData('row', newRow);
    piece.setData('col', newCol);
    piece.x = this.offsetX + newCol * this.tileSize;
    piece.y = this.offsetY + newRow * this.tileSize;
  }
}
