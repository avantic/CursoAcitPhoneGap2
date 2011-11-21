package net.avantic.cursoAcit;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class CursoAcitPhoneGapActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        
        super.appView.setInitialScale(((Float)(getResources().getDisplayMetrics().density * 100)).intValue());
        
        super.loadUrl("file:///android_asset/www/index.html");
    }
}