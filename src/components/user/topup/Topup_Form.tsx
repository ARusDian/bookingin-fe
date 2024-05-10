const Topup_Form = () => {

  const whatsappNumber = "+6282150667710";

  const handleWhatsAppClick = () => {
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm mb-2">
        Informasikan Nama dan ID bersangkutan dan bukti transfer kepada nomor tersebut !
        </label>
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white w-full font-bold py-2 px-4 rounded"
        >
          Hubungi kami melalui WhatsApp !
        </button>
      </div>
    </>
  );
};

export default Topup_Form;
