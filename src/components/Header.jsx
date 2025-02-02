import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faHospital } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const users = [
  { name: 'Patient Login', description: 'Book appointment & get treatment', to: "/patient/login", icon: faUser },
  { name: 'Doctor Login', description: 'Check up patients from your home', to: '/doctor/login', icon: faUserDoctor },
  { name: 'Hospital Login', description: "Upload patient's reports & bills", to: '/', icon: faHospital },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5 text-lg font-bold leading-6 text-white">
            <img className="h-8 w-auto float-left mr-2" src="/logo.png" alt="" /> HealthNet Management
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {/* Login Dropdown */}
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 px-4 py-2 text-sm font-semibold leading-6 text-white  rounded-lg hover:bg-blue-700 transition">
              Login
              <ChevronDownIcon className="h-5 w-5 flex-none text-white" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {users.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <FontAwesomeIcon className="fa-2x text-gray-900" icon={item.icon} />
                      </div>
                      <div className="flex-auto">
                        <NavLink to={item.to} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </NavLink>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          {/* Other Links */}
          <NavLink to="#features" className="flex items-center gap-x-1 px-4 py-2 text-sm font-semibold leading-6 text-white  rounded-lg hover:bg-blue-700 transition">
            Features
          </NavLink>
          <NavLink to="#about" className="flex items-center gap-x-1 px-4 py-2 text-sm font-semibold leading-6 text-white  rounded-lg hover:bg-blue-700 transition">
            About
          </NavLink>
          <NavLink to="#team" className="flex items-center gap-x-1 px-4 py-2 text-sm font-semibold leading-6 text-white  rounded-lg hover:bg-blue-700 transition">
            Team
          </NavLink>
        </Popover.Group>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5 text-lg font-bold leading-6 text-gray-900">
              <img className="h-8 w-auto float-left mr-2" src="/logo.png" alt="Logo" /> HealthNet Management
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Login Disclosure */}
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Login
                      <ChevronDownIcon
                        className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2">
                      {users.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {/* Other Links */}
              <div className="py-6">
                <NavLink
                  to="#features"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </NavLink>
                <NavLink
                  to="#about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </NavLink>
                <NavLink
                  to="#team"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Team
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
