import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany();
  return new Response(JSON.stringify(todos));  
}

export async function POST(request) {
  const { task } = await request.json();
  const newTodo = await prisma.todo.create({
    data: { task }
  });
  return new Response(JSON.stringify(newTodo), { status: 201 });
}






export async function PUT(request) {
  const { id, task, isCompleted } = await request.json();
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { task,isCompleted  }
  });
  return new Response(JSON.stringify(updatedTodo));
}

export async function DELETE(request) {
  const { id } = await request.json();
  if(id){
    const deletedTodo = await prisma.todo.delete({
      where: { id }
    });
    return new Response(JSON.stringify(deletedTodo));
  }else {
    const deletedTodos = await prisma.todo.deleteMany();
    return new Response(JSON.stringify(deletedTodos));
  }

}






// export async function DELETE_ALL() {
//   // Perform the delete operation without specifying an ID
//   const deletedTodos = await prisma.todo.deleteMany();  // This deletes all rows in the `todo` table
//   return new Response(JSON.stringify(deletedTodos));
// }

