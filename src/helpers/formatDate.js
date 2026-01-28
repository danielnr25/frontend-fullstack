export function formatDate(dateString) {
   if (!dateString) return '';
   const date = new Date(dateString);

   return date.toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
   });
}

export function formatDateOnly(dateString) {
   if (!dateString) return '';
   const date = new Date(dateString);

   return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
   });
}


export function getCurrentMonthDateRange() {
   const now = new Date();
   const start = new Date(now.getFullYear(), now.getMonth(), 1);
   const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

   const formatDatePart = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   return {
      startDate: formatDatePart(start),
      endDate: formatDatePart(end),
   };
}

export const getLastFiveDaysDateRange = () => {
   const now = new Date();
   const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() );
   const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5);

   const formatDatePart = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   return {
      startDate: formatDatePart(start),
      endDate: formatDatePart(end),
   };
}
