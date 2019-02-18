import java.awt.*;
import java.awt.event.*;

public class Challonge extends Frame implements ActionListener, WindowListener, KeyListener {
	private String tournament = "";
	private String api_key = "";
	private int displayCount = 0;
	private int refresh = 0;

	public Challonge () {
	   setLayout(new FlowLayout());

	   Panel pnlTournament = new Panel();
	   add(pnlTournament);
	   Panel pnlApi = new Panel();
	   add(pnlApi);
	   Panel pnlBottom = new Panel();
	   add(pnlBottom);
	   Panel pnlDisplayCount = new Panel();
	   pnlBottom.add(pnlDisplayCount);
	   Panel pnlRefresh = new Panel();
	   pnlBottom.add(pnlRefresh);
	   Panel pnlConfirm = new Panel();
	   pnlBottom.add(pnlConfirm);

	   Label lblTournament = new Label("Tournament Link:");
	   pnlTournament.add(lblTournament);

	   TextField tfTournament = new TextField(tournament, 45);
	   tfTournament.setEditable(true);
	   pnlTournament.add(tfTournament);

	   Label lblApi = new Label("API Key:");
	   pnlApi.add(lblApi);

	   TextField tfApi = new TextField(api_key, 40);
	   tfApi.setEditable(true);
	   pnlApi.add(tfApi);

	   Label lblDisplayCount = new Label("Sets to Display:");
	   pnlDisplayCount.add(lblDisplayCount);

	   TextField tfDisplayCount = new TextField(displayCount + "", 10);
	   tfDisplayCount.setEditable(true);
	   pnlRefresh.add(tfDisplayCount);

	   Label lblRefresh = new Label("Refresh Rate:");
	   pnlRefresh.add(lblRefresh);

	   TextField tfRefresh = new TextField(refresh + "", 10);
	   tfRefresh.setEditable(true);
	   pnlRefresh.add(tfRefresh);

	   Button btnConfirm = new Button("Confirm");
	   pnlConfirm.add(btnConfirm);

	   addWindowListener(this);
	   tfTournament.addKeyListener(this);
	   tfApi.addKeyListener(this);
	   tfDisplayCount.addKeyListener(this);
	   tfRefresh.addKeyListener(this);

	   setTitle("Grab Recent Sets");
	   setSize(600, 200);
	   setVisible(true);
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