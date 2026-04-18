package com.tseiiti.projetointegrador6.view

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.compose.BackHandler
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.viewinterop.AndroidView

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun Home(url: String) {
    var webView: WebView? = null
    var backButton by remember { mutableStateOf(false) }

    AndroidView(factory = { context ->
        WebView(context).apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
            settings.loadWithOverviewMode = true
            settings.setSupportZoom(true)

            webViewClient = object : WebViewClient() {
                override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                    backButton = view?.canGoBack() ?: false
                }
            }
            loadUrl(url)
        }
    }, update = {
        webView = it
    })

    BackHandler(enabled = backButton) {
        webView?.goBack()
    }
}
