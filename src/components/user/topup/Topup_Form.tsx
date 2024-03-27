const Topup_Form = () => {
    return ( 
        <>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm mb-2"
          >
            Jumlah Uang
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Nama Pengguna"
            // value={username}
            // onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm mb-2"
          >
            Bukti Transfer
          </label>
          <input
            type="file"
            id="username"
            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-pink-500"
            placeholder="Isi Nama Pengguna"
            // value={username}
            // onChange={handleUsernameChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-pink-400 hover:bg-pink-700 text-white w-full font-bold py-2 px-4 rounded"
        >
          Top Up !
        </button>
        </>
     );
}
 
export default Topup_Form;