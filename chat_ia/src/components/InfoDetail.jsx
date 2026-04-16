const InfoDetail = ({model}) => {
  return (
    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 p-4 bg-white shadow-lg rounded-lg w-100 z-10 border border-gray-200">
      <h4 className="font-semibold mb-2 text-[12px] text-gray-800 uppercase">{model?.name}</h4>
      <div className="text-[10px]">
        <p className="p-1">
          <span className="text-gray-500">family:</span><br />
          <span className="text-gray-900">{model?.details?.family}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">modified_at:</span><br />
          <span className="text-gray-900">{model?.modified_at}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">size:</span><br />
          <span className="text-green-600">{(model?.size / 1024 ** 2).toFixed(2)}MB</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">parameter_size:</span><br />
          <span className="text-green-600">{model?.details?.parameter_size}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">quantization_level:</span><br />
          <span className="text-gray-900">{model?.details?.quantization_level}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">digest:</span><br />
          <span className="text-gray-600">{model?.digest}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">format:</span><br />
          <span className="text-gray-600">{model?.details?.format}</span>
        </p>
        <p className="p-1">
          <span className="text-gray-500">parent_model:</span><br />
          <span className="text-gray-600">{model?.details?.parent_model}</span>
        </p>
      </div>
    </span>
  )
};

export default InfoDetail;