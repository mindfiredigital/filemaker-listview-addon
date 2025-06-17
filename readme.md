# FileMaker List View Add-on (WebViewer-based)

This add-on allows you to create a JavaScript-Powered list view in FileMaker using any table. It leverages a WebViewer for dynamic UI rendering, providing flexibility and better user interaction.

---

## 🚀 Steps to Use the Add-on

1. **Navigate to the FileMaker folder in the repository.**

2. **Download the add-on file**  
   Download the file: `ListViewAddon.fmp12`.

3. **Open Script Workspace**

   - On Windows: Press `Ctrl + Shift + S`
   - On macOS: Press `Command + Shift + S`

4. **Run the script**  
   Execute the script provided in `ListViewAddon.fmp12` to install/register the add-on.

5. **Open the target FileMaker file**  
   This is the file where you want to add the list view.

6. **Create a new layout**

   - Base it on the table you want the list view to display.

7. **Open Layout Mode**

   - Go to `View > Layout Mode`, or press `Ctrl + L` (Windows) / `Cmd + L` (Mac).
   - From the Add-ons tab on the left panel, locate the List View add-on (installed from step 4).
   - **Drag and drop the List View add-on** onto your layout.

8. **Configure the List View**

   - Once placed on the layout, you'll see a **gear/settings icon** at the top right corner of the list view.
   - Click the icon to open the **List View Configurator**.

9. **Select the source table**  
   Choose the table from which you want to display records.

10. **Select fields to display**

    - Click the gear icon next to the field selection dropdown.
    - Check the fields you want in your list.
    - ⚠️ _If fields do not appear immediately, close and reopen the configurator._

11. **Choose list size**  
    Pick the display size or number of items per page as needed.

12. **Click "Save"**  
    The list view will render with your selected data and configuration.

---

## 🛠 Additional Setup

- **On Layout Enter Script**:  
  Add the script `CreateCustomerDataJson2` as the "OnLayoutEnter" trigger for your layout.  
  This script prepares the JSON data used by the list view.

---

## 💡 Notes

- ✅ **No script parameter is required** when running the configuration or display scripts.
- 🔄 You can reconfigure the list view at any time using the gear icon.
- 🌐 This setup supports dynamic display and works independently from layout objects or portals.

---
