export default function Pagination({currentPage = 1,totalPages = 1,onPageChange,totalItems = 0}) {
  //if (!totalPages || totalPages <= 1) return null;
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end items-center mt-6 space-x-2">
      {/* Botón Anterior */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md transition-colors ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Anterior
      </button>

      {/* Botones numéricos */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-1 rounded-md transition-colors ${
              currentPage === pageNum
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md transition-colors ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Siguiente
      </button>

      {/* Total de registros */}
      <div className="ml-4 text-gray-700 text-sm font-medium">
        Total de registros: {totalItems}
      </div>
    </div>
  );
}
