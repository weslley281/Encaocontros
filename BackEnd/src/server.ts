import { app } from '.';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`A aplicação está rodando na porta http://localhost:${port}`);
});
