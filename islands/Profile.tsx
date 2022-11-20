interface Props {}

export default function (props: Props) {
  return (
    <div class="w-full">
      <div class="p-8 bg-white shadow">
        <div class="">
          <img
            class="w-1/2 rounded-2xl mb-3"
            src="https://tailwindcss.com/img/card-left.jpg"
          />
          <div class="space-x-2">
            <button class="text-white py-2 px-4 uppercase rounded-full hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-500">
              Like
            </button>
            <button class="text-white py-2 px-4 uppercase rounded-full bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-green-700 to-green-500">
              Message
            </button>
            <button class="text-white py-2 px-4 uppercase rounded-full bg-red-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 bg-gradient-to-br from-red-500 via-pink-500 to-red-500">
              Report
            </button>
          </div>
        </div>
        <div class="mt-2 border-b pb-2">
          <h1 class="text-4xl font-medium text-gray-700">
            Jessica Jones, <span class="font-light text-gray-500">27</span>
          </h1>
          <p class="font-light text-gray-600 mt-3">Bucharest, Romania</p>
          <p class="font-light text-gray-600 mt-3">
            Nữ - Ly dị - 34 tuổi - Cao 162 cm - Nặng 51 kg - Đại học
          </p>
          <p class="mt-3 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>
          <p class="mt-2 text-gray-500">University of Computer Science</p>
        </div>
        <p class="text-gray-600 font-light mt-2">
          An artist of considerable range, Ryan — the name taken by
          Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and
          records all of his own music, giving it a warm, intimate feel with a
          solid groove structure. An artist of considerable range.
        </p>
      </div>
    </div>
  );
}
