import socketio from 'socket.io';

const io = socketio.listen(app);

const roomId = '#8BHJL'

io.on('connection', async socket => {
  // join() allows to join a room/channel
  // Here, `await` is used; as socketio join operation uses mix of async and sync operations
  await socket.join(roomId);
  
  logger.info('Client Connected');
});