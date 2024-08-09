import styles from '@/styles/style';
import React, { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faAdd, faTrash} from '@fortawesome/free-solid-svg-icons';
type Props = {
  settings: any;
  setSettings: (settings: any) => void;
  toggleModal: () => void;
};

const NavigationModal: React.FC<Props> = ({ settings, setSettings, toggleModal }) => {
  const handleMenuItemChange = (index: number, name: string, value: string) => {
    const newMenuItems = settings.menuItems.map((item: any, i: number) =>
      i === index ? { ...item, [name]: value } : item
    );
    setSettings({ ...settings, menuItems: newMenuItems });
  };

  const handleAddMenuItem = () => {
    setSettings({
      ...settings,
      menuItems: [...settings.menuItems, { text: '', url: '' }]
    });
  };

  const handleRemoveMenuItem = (index: number) => {
    const newMenuItems = settings.menuItems.filter((_: any, i: number) => i !== index);
    setSettings({ ...settings, menuItems: newMenuItems });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white w-2/3 p-10 rounded">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Navigation</h2>
          <div>
            <button onClick={toggleModal} className="mr-2 p-2 ">Cancel</button>
            <button onClick={toggleModal} className={styles.editButton}>Save</button>
          </div>
        </div>
        {settings.menuItems.map((item: any, index: number) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              name="text"
              value={item.text}
              onChange={(e) => handleMenuItemChange(index, 'text', e.target.value)}
              placeholder="Menu Text"
              className="w-full p-2 border border-gray-300 rounded mr-2"
            />
            <input
              type="text"
              name="url"
              value={item.url}
              onChange={(e) => handleMenuItemChange(index, 'url', e.target.value)}
              placeholder="Menu URL"
              className="w-full p-2 border border-gray-300 rounded mr-2"
            />
            <button
              onClick={() => handleRemoveMenuItem(index)}
              className="p-1 bg-red-500 text-white rounded flex justify-center"
                >
                    <FontAwesomeIcon icon={faTrash} className="p-2" />
            </button>
          </div>
        ))}
              <button onClick={handleAddMenuItem} className="p-1 bg-green-500 text-white rounded flex justify-center">
                  <FontAwesomeIcon icon={faAdd} className="p-1" />
                  </button>
      </div>
    </div>
  );
};

export default NavigationModal;
