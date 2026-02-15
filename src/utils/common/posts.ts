export const getThreat = (avg: number) => {
  if (avg >= 0.8)
    return {
      label: 'Protes Tinggi',
      className: 'bg-red-100 text-red-700 border border-red-200',
    };
  if (avg >= 0.5)
    return {
      label: 'Protes Sedang',
      className: 'bg-amber-100 text-amber-700 border border-amber-200',
    };
  return {
    label: 'Protes Rendah',
    className: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  };
};

export const getCommentLevel = (comments: number) => {
  if (comments === 0) {
    return {
      label: 'No Discussion',
      className: 'bg-slate-100 text-slate-700',
    };
  }

  if (comments <= 2) {
    return {
      label: 'Low',
      className: 'bg-blue-100 text-blue-700',
    };
  }

  if (comments <= 5) {
    return {
      label: 'Moderate',
      className: 'bg-yellow-100 text-yellow-800',
    };
  }

  return {
    label: 'High',
    className: 'bg-red-100 text-red-700',
  };
};
