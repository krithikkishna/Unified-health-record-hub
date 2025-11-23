import classNames from 'classnames';

export const Card = ({ className, children }) => (
  <div className={classNames("bg-white rounded-2xl shadow-md p-4", className)}>
    {children}
  </div>
);

// ✅ Header section with larger, bold text
export const CardHeader = ({ className, children }) => (
  <div className={classNames("mb-4 font-semibold text-xl", className)}>
    {children}
  </div>
);

// ✅ Content section with margin-top spacing
export const CardContent = ({ className, children }) => (
  <div className={classNames("mt-2", className)}>
    {children}
  </div>
);

// ✅ Footer section with border and spacing
export const CardFooter = ({ className, children }) => (
  <div className={classNames("mt-4 border-t pt-2", className)}>
    {children}
  </div>
);
