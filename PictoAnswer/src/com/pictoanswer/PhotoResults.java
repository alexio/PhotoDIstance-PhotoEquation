package com.pictoanswer;

import java.io.File;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Environment;
import android.view.Menu;
import android.widget.TextView;

public class PhotoResults extends Activity {

	private ProgressDialog busyDialog = null;
	private Context con;
	private TextView input;
	private TextView answer;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_results);
		
		input = (TextView) findViewById(R.id.input);
		answer = (TextView) findViewById(R.id.result);
		
		con = this;
		try {
			System.out.println("Getting here");
			getPictureInBackground();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.results, menu);
		return true;
	}

	public void getPictureInBackground() throws InterruptedException, ExecutionException
	{
			showBusyDialog();
	    	new PictureTask().execute(this);
	}
	
	public void upload() throws Exception{
		
		//Create a new picture file to send to the server
		File pictureFile = new File(Environment.getExternalStorageDirectory() + "/DCIM/Camera/"+"image" + new Date().getDay() + ".tiff");
		//Get the http clientmm
		
		HttpClient client = new DefaultHttpClient();
		//Get the HttpPost data
		HttpPost post = new HttpPost("http://198.211.114.151:8999");
		MultipartEntity entity = new MultipartEntity();
		
		ContentBody content = new FileBody(pictureFile,"image/tiff");
		
		
		entity.addPart("image",content);
		//add entities to make sure the server is recieving the information
		entity.addPart("data", new StringBody("Test report", Charset.forName("UTF-8")));
		
		System.out.println("before post");
		
		//post to the server main
		post.setEntity(entity);
		System.out.println("posting");

		//get the response from the servers
		HttpResponse response = client.execute(post);
		
		System.out.println("getting after execute");
		
		HttpEntity entityRes = response.getEntity();
		
		String stringResponse = EntityUtils.toString(entityRes);
		
		//The server then returns the computed result in json format to the phone
		JSONArray jsonarray = new JSONArray("["+stringResponse+"]");
        JSONObject jsonobject = jsonarray.getJSONObject(0);
        System.out.println("getting object");
        
        
        //Lets print the results
        String problem = (jsonobject.getString("problem"))+"";
        String answer = (jsonobject.getString("answer"))+"";
        //Close the connection
        
        System.out.println("The problem is : " + problem);
        System.out.println("The result is : " + answer);
        
        client.getConnectionManager().shutdown();
		//stop connection to server
		
	}
	
	private class PictureTask extends AsyncTask<Context, Void, Void>{
       
		
		@Override
        protected Void doInBackground(Context... arg0) {
			Void v = null;
			try {
				upload();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return v;
	        		//System.out.println("Getting picture at " + Environment.getExternalStorageDirectory() + "/DCIM/"+ "image" + new Date().getDay() + ".tif");
        }
        
        @Override
        protected void onPostExecute(Void v) {
            busyDialog.dismiss();
            return;
        }
    }

    public void showBusyDialog() {
        busyDialog = ProgressDialog.show(this, "", "Getting your solution Please wait...",
                true);
    }

    public void dismissBusyDialog() {
        if (busyDialog != null) {
            busyDialog.dismiss();
        }
    }
}
