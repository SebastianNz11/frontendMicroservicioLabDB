import { Clientes } from "./Clientes";
import { Procuradores } from "./Procuradores";
import { Navbar } from "./Navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex align-content-center">
        <div className="col-6 pe-5 border-3 border-end">
          <Clientes />
        </div>
        <div className="col-6 ps-5">
          <Procuradores />
        </div>
      </div>
    </>
  );
};
