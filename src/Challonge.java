import java.awt.*;
import java.awt.event.*;

public class Challonge extends Frame implements ActionListener, WindowListener, KeyListener {
	private String tournament = "";
	private String api_key = "";
	private int display_count = 3;
	private int refresh = 1;

	public Challonge () {
	   Frame frame = new Frame();
	   frame.setLayout(new FlowLayout());

	   Panel pnl_tournament = new Panel();
	   frame.add(pnl_tournament);
	   Panel pnl_api = new Panel();
	   frame.add(pnl_api);
	   Panel pnl_bottom = new Panel();
	   frame.add(pnl_bottom);
	   Panel pnl_displayCount = new Panel();
	   pnl_bottom.add(pnl_displayCount);
	   Panel pnl_refresh = new Panel();
	   pnl_bottom.add(pnl_refresh);
	   Panel pnl_confirm = new Panel();
	   pnl_bottom.add(pnl_confirm);

	   Label lbl_tournament = new Label("Tournament Link:");
	   pnl_tournament.add(lbl_tournament);

	   TextField tf_tournament = new TextField(tournament + "", 45);
	   tf_tournament.setEditable(true);
	   pnl_tournament.add(tf_tournament);

	   Label lbl_api = new Label("API Key:");
	   pnl_api.add(lbl_api);

	   TextField tf_api = new TextField(api_key + "", 40);
	   tf_api.setEditable(true);
	   pnl_api.add(tf_api);

	   Label lbl_displayCount = new Label("Sets to Display:");
	   pnl_displayCount.add(lbl_displayCount);

	   TextField tf_displayCount = new TextField(display_count + "", 10);
	   tf_displayCount.setEditable(true);
	   pnl_refresh.add(tf_displayCount);

	   Label lbl_refresh = new Label("Refresh Rate:");
	   pnl_refresh.add(lbl_refresh);

	   TextField tf_refresh = new TextField(refresh + "", 10);
	   tf_refresh.setEditable(true);
	   pnl_refresh.add(tf_refresh);

	   Button btn_confirm = new Button("Confirm");
	   pnl_confirm.add(btn_confirm);

	   frame.addWindowListener(this);
	   tf_tournament.addKeyListener(this);
	   tf_api.addKeyListener(this);
	   tf_displayCount.addKeyListener(this);
	   tf_refresh.addKeyListener(this);
	   
	   final MenuBar menuBar = new MenuBar();
	   Menu options = new Menu("Options");
	   
	   MenuItem menu_default = new MenuItem("Reset to Default");
	   menu_default.setActionCommand("default");
	   
	   options.add(menu_default);
	   menuBar.add(options);
	   frame.setMenuBar(menuBar);
	   
	   frame.setTitle("Grab Recent Sets");
	   frame.setSize(600, 250);
	   frame.setVisible(true);
	}

	public static void main(String[] args) {
	   new Challonge();
	}
 
	@Override
	public void actionPerformed(ActionEvent evt) {
		
	}
	@Override
	public void windowClosing(WindowEvent evt) {
		System.exit(0);
	}
	@Override
	public void keyTyped(KeyEvent evt) {
		System.out.println(this);
	}

	// Unused but required
	@Override public void windowOpened(WindowEvent evt) { }
	@Override public void windowClosed(WindowEvent evt) { }
	@Override public void windowIconified(WindowEvent evt) { }
	@Override public void windowDeiconified(WindowEvent evt) { }
	@Override public void windowActivated(WindowEvent evt) { }
	@Override public void windowDeactivated(WindowEvent evt) { }
	@Override public void keyPressed(KeyEvent evt) { }
	@Override public void keyReleased(KeyEvent evt) { }
}