import React from 'react';
import { slide as Slide } from 'react-burger-menu';

import BurgerMenuSection from 'components/BurgerMenuSection/BurgerMenuSection';
import { CloseButton } from './CloseButton';

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
  handleClose: () => void;
  title: React.ReactNode;
  filtersList: string[];
  closeMenu: () => void;
}

export const MobileFilterMenu: React.FC<Props> = ({
  menuState,
  handleClose,
  title,
  filtersList,
  closeMenu,
}) => {
  return (
    /*
     * The library default behaviour is to have a fixed close icon which
     * made the icon overlap with the menu content as we scrolled.
     * To fix this issue we use our own close button which scrolls along
     * the content and imperatively closes the drawer.
     */
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={false}
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
    >
      <div className="relative text-center w-full pb-4 font-bold border-b border-solid border-greySoft outline-none">
        <CloseButton closeMenu={closeMenu} className="absolute left-0" />
        <span>{title}</span>
      </div>
      {filtersList.map(section => (
        <BurgerMenuSection title={section} key={section} />
      ))}
    </Slide>
  );
};
