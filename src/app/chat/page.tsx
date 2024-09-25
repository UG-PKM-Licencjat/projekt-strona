export default function Chat() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-neo-green-dark mb-4 text-2xl font-semibold">
          Wybierz jedną z konwersacji
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Skontaktuj się z artystą poprzez oferty lub wybierz konwersację z
          panelu z boku.
        </p>
        <button className="bg-neo-green hover:bg-neo-green-dark rounded px-4 py-2 font-bold text-white">
          Skontaktuj się z artystą
        </button>
      </div>
    </div>
  );
}
